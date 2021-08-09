window.addEventListener('load', function(){
    const container = document.querySelector(".container");
    const canvas = document.querySelector('canvas');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let audioSource;
    let analyser;
    let objUrl=undefined
    const fileInput=document.querySelector('.fileInput')
    fileInput.addEventListener('change',(e)=>{
        objUrl=URL.createObjectURL(e.target.files[0])
        if(objUrl!==undefined){
            const audio1 = document.getElementById("audio1");
            audio1.src = objUrl
            audio1.play();
            const audioContext = new AudioContext();
            if (!audioSource) {
              audioSource = audioContext.createMediaElementSource(audio1);
              analyser = audioContext.createAnalyser();
              audioSource.connect(analyser);
              analyser.connect(audioContext.destination);
            }
        
            analyser.fftSize = 64;
            const bufferLength = analyser.frequencyBinCount;
      
            const dataArray = new Uint8Array(bufferLength);
      
            const barWidth = (canvas.width / bufferLength);
            let barHeight;
            let x = 0;
      
            function animate() {
              ctx.clearRect(0,0,canvas.width, canvas.height);
              x = 0;
              analyser.getByteFrequencyData(dataArray);
      
              for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 1.5;
                
                const red = 250 * (i/bufferLength);
                const green = 0;
                const blue = barHeight + (2 * (i/bufferLength));
      
                ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
                x += barWidth + 1;
              }
              requestAnimationFrame(animate);
            }
      
          animate();
          }
        }
    )

      
});
