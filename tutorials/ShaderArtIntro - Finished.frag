// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
precision mediump float;

vec3 palette(float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(2.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.25, 0.25);

    return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // float time = iTime * 2.0;

    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;
    vec2 uv0 = uv;

    vec3 finalColour = vec3(0.0);

    for (float i = 0.0; i < 2.0; i++)
    {
        // Create repetition
        uv = uv * 1.5; // Double frequency of space
        uv = fract(uv); // Take decimals only
        uv -= 0.5; // re-centre

        // d represents distance from origin
        float d = length(uv) * exp(-length(uv0));

        // Now use d value to control the brightness of a custom colour
        // Note the rgb components don't need to be normalised at this point
        vec3 col = palette(length(uv0) + iTime * 0.4);

        // Use d as input to sine function, and increase frequency to get repeating pattern
        d = sin(d * 8.0 - iTime) / 8.0;
        // Cannot show negative colour, so take abs for SDF
        d = abs(d);

        // Use inverse function (y = 1/x) to get neon glow effect
        // Scale down so that normalised input produces some output below 1.0
        d = 0.02 / d - 0.2;

        // Increase contrast (I found that translating 1/x above worked better)
        // d = pow(d, 1.3);

        finalColour += col * d;
    }

    fragColor = vec4(finalColour, 1.0);
}
