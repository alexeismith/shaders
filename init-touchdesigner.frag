out vec4 fragColor;

uniform vec4 vectorIn;

void main()
{
    // Convert TD uniform to vec2 for convenience
	vec2 iResolution = uTDOutputInfo.res.zw;

    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / minres;
	
    // Use input unform for brightness
	vec3 color = vec3(uv * vectorIn.x, 0.0);
	
    // Output must be wrapped in TDOutputSwizzle for cross-platform compat
	fragColor = TDOutputSwizzle(vec4(color, 1.0));
}
