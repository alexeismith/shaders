// PARAMETERS
#define SPEED (0.5)
#define SIZE (0.1)

float bounceOut(float t) {
    const float a = 4.0 / 11.0;
    const float b = 8.0 / 11.0;
    const float c = 9.0 / 10.0;

    const float ca = 4356.0 / 361.0;
    const float cb = 35442.0 / 1805.0;
    const float cc = 16061.0 / 1805.0;

    float t2 = t * t;

    return t < a
    ? 7.5625 * t2 : t < b
    ? 9.075 * t2 - 9.9 * t + 3.4 : t < c
    ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    // Fill y axis
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Animate value in range 0-1
    float anim = mod(iTime * SPEED, 1.0);

    // Translate y-axis using animation
    uv.y += 2.0 * (bounceOut(anim) - 0.5) - SIZE;

    // Measure distance from (translated) origin
    float d = length(uv);

    // Draw circle SDF
    // To create white ball, arguments to step function are reversed
    vec3 col = vec3(step(d, SIZE));

    // Output to screen
    fragColor = vec4(col, 1.0);
}
