// Interactive audio / wave lab using Web Audio API + microphone
const AudioLab = (() => {
  let audioCtx = null;
  let analyser = null;
  let micStream = null;
  let dataArray = null;
  let running = false;
  let canvas = null, ctx = null;
  let barsEl = null;

  async function startMic(canvasEl, barsContainer) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    barsEl = barsContainer;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      running = true;
      draw();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || 'Microphone denied' };
    }
  }

  function stopMic() {
    running = false;
    if (micStream) {
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  function draw() {
    if (!running || !analyser) return;
    analyser.getByteFrequencyData(dataArray);
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#080e1a';
    ctx.fillRect(0, 0, w, h);

    // waveform-ish bars
    const n = dataArray.length;
    const barW = w / n;
    let sum = 0, peak = 0, peakIdx = 0;
    for (let i = 0; i < n; i++) {
      const v = dataArray[i];
      sum += v;
      if (v > peak) { peak = v; peakIdx = i; }
      const barH = (v / 255) * (h - 20);
      const g = ctx.createLinearGradient(0, h, 0, h - barH);
      g.addColorStop(0, '#0e7490');
      g.addColorStop(1, '#22d3ee');
      ctx.fillStyle = g;
      ctx.fillRect(i * barW, h - barH - 10, barW - 1, barH);
    }

    // dominant frequency estimate
    const sampleRate = audioCtx ? audioCtx.sampleRate : 44100;
    const freq = peakIdx * sampleRate / (analyser.fftSize);
    const avg = sum / n;

    if (barsEl) {
      // mini bars
      const kids = barsEl.children;
      const step = Math.floor(n / 32) || 1;
      for (let i = 0; i < 32; i++) {
        const v = dataArray[i * step] || 0;
        if (kids[i]) kids[i].style.height = Math.max(2, (v / 255) * 70) + 'px';
      }
    }

    // labels
    ctx.fillStyle = '#8aa0b8';
    ctx.font = '12px Tahoma';
    ctx.fillText(`Peak ≈ ${freq.toFixed(0)} Hz · Level ${avg.toFixed(0)}`, 12, 18);

    requestAnimationFrame(draw);
    return { freq, avg, peak };
  }

  function makeBarStrip(container, count = 32) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const iEl = document.createElement('i');
      iEl.style.height = '2px';
      container.appendChild(iEl);
    }
  }

  // Synthetic wave generator (no mic)
  let osc = null, gain = null;
  function playTone(freq = 440, type = 'sine') {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    stopTone();
    osc = audioCtx.createOscillator();
    gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.15;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
  }
  function stopTone() {
    try { if (osc) { osc.stop(); osc.disconnect(); } } catch (e) {}
    osc = null;
  }
  function setToneFreq(f) {
    if (osc) osc.frequency.setTargetAtTime(f, audioCtx.currentTime, 0.02);
  }

  return { startMic, stopMic, makeBarStrip, playTone, stopTone, setToneFreq };
})();
