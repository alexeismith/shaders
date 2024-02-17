// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // d represents distance from origin
    float d = length(uv);

    // Use d as input to sine function, and increase frequency to get repeating pattern
    d = sin(d * 8.0 + iTime) / 8.0;

    // Cannot show negative colour, so take abs for SDF
    d = abs(d);
    // Use smooth step to show SDF
    // d = smoothstep(0.0, 0.1, d);

    // Use inverse function (y = 1/x) to get neon glow effect
    // Scale down so that normalised input produces some output below 1.0
    d = 0.02 / d;

    // Now use d value to control the brightness of a custom colour
    // Note the rgb components don't need to be normalised at this point
    vec3 col = vec3(1.0, 2.0, 3.0);
    col *= d;

    fragColor = vec4(col, 1.0);
}
