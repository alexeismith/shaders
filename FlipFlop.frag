void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Saw wave / ramp
    // float x = mod(iTime, 1.0);

    // Square wave / 1sec flip-flop
    float x = round(mod(iTime * 0.5, 1.0));

    // Cosine slide in right
    float a = 0.5 + 0.5*cos(uv.x * mod(iTime * 2.0*3.14, 2.0*3.14));
    // Cosine slide out left
    float b = 0.5 + 0.5*cos((1.0 - uv.x) * mod(-iTime * 2.0*3.14, 2.0*3.14));

    // fragColor = vec4(x, 0.0, 0.0, 1.0);
    fragColor = vec4(x * a + (1.0-x) * b, 0.0, 0.0, 1.0);
}