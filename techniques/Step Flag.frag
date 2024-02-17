void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    vec3 blue = vec3(0.0, 0.149, 0.329);
    vec3 white = vec3(1.0);
    vec3 red = vec3(0.929, 0.161, 0.224);

    blue *= step(uv.x, 1.0 / 3.0);
    white *= step(uv.x, 2.0 / 3.0) * step(1.0 / 3.0, uv.x);
    red *= step(2.0 / 3.0, uv.x);

    fragColor = vec4(blue + white + red, 1.0);
}
