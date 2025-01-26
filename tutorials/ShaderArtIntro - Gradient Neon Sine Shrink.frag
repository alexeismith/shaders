// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY

vec3 palette(float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;

    // d represents distance from origin
    float d = length(uv);

    // Now use d value to control the brightness of a custom colour
    // Note the rgb components don't need to be normalised at this point
    vec3 col = palette(d + iTime);

    // Use d as input to sine function, and increase frequency to get repeating pattern
    d = sin(d * 8.0 + iTime) / 8.0;
    // Cannot show negative colour, so take abs for SDF
    d = abs(d);

    // Use inverse function (y = 1/x) to get neon glow effect
    // Scale down so that normalised input produces some output below 1.0
    d = 0.02 / d;

    col *= d;

    fragColor = vec4(col, 1.0);
}
