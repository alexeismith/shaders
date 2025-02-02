// Output color is declared manually
out vec4 fragColor;

// Inputs are configured in the Vectors tab of GLSL properties
uniform vec4 iTime;
uniform vec4 uSlider;

void main()
{
    // Convert TD uniform to vec2 for convenience
	vec2 iResolution = uTDOutputInfo.res.zw;

    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / minres;
    
    // Flip uv using time
    uv *= sin(iTime.x * 0.01);
	
    // Use input unform for brightness
	vec4 color = vec4(uv * uSlider.x, 0.0, 1.0);
	
	// Reduce colour banding using dither
	color = TDDither(color);
	
    // Output must be wrapped in TDOutputSwizzle for cross-platform compat
	fragColor = TDOutputSwizzle(color);
}
