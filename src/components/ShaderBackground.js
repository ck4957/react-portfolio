import React, { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with dithering
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float bayer2(vec2 coord) {
        float pattern[4];
        pattern[0] = 0.0; pattern[1] = 2.0;
        pattern[2] = 3.0; pattern[3] = 1.0;
        int x = int(mod(coord.x, 2.0));
        int y = int(mod(coord.y, 2.0));
        return pattern[x + y * 2] / 4.0;
      }

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 coord = gl_FragCoord.xy;
        
        float t = u_time * 0.15;
        vec2 p = uv * 3.0 + vec2(t * 0.1, t * 0.05);
        
        float n1 = fbm(p);
        float n2 = fbm(p * 2.0 + vec2(t * 0.2, -t * 0.15));
        float n3 = fbm(p * 4.0 - vec2(t * 0.3, t * 0.1));
        
        float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        
        float wave = sin(uv.x * 10.0 + t) * cos(uv.y * 8.0 - t * 0.5) * 0.1;
        pattern += wave;
        
        float dither = bayer2(coord);
        pattern += (dither - 0.5) * 0.15;
        
        pattern = floor(pattern * 6.0) / 6.0;
        
        vec3 color1 = vec3(0.05, 0.05, 0.08);
        vec3 color2 = vec3(0.08, 0.12, 0.18);
        vec3 color3 = vec3(0.15, 0.18, 0.25);
        vec3 color4 = vec3(0.2, 0.25, 0.35);
        
        vec3 finalColor = mix(color1, color2, smoothstep(0.0, 0.3, pattern));
        finalColor = mix(finalColor, color3, smoothstep(0.3, 0.6, pattern));
        finalColor = mix(finalColor, color4, smoothstep(0.6, 1.0, pattern));
        
        float glow = pow(1.0 - length(uv - 0.5) * 0.8, 2.0) * 0.1;
        finalColor += vec3(glow * 0.3, glow * 0.4, glow * 0.6);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    // Animation loop
    let startTime = Date.now();
    let animationId;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ShaderBackground;
