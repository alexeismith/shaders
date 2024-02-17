// PARAMETERS
#define SPEED (0.5)
#define DISTANCE (1.2)
#define SIZE (0.1)
#define NUM_BALLS (6)
#define TIME_OFFSET (0.3)

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

float random(vec2 normSeed)
{
    return fract(sin(dot(normSeed.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    vec3 col;
    vec2 uvTrans;
    float xOffset, timeOffset, anim, d;

    // Iterate over balls
    for (int i = 0; i < NUM_BALLS; i++)
    {
        // Distribute balls across x-axis
        xOffset = 1.0 - (2.0 / float(NUM_BALLS + 1)) * float(i + 1);

        // Create translated uv for this ball
        uvTrans = uv;
        // Not sure why xOffset goes from right to left, check axes
        uvTrans.x -= xOffset;

        // Create time offset for this ball
        timeOffset = random(vec2(i, 0.0)) * float(i);

        // Animate value in range 0-1
        anim = mod(iTime * SPEED + timeOffset, 1.0);

        // Translate y-axis using animation
        uvTrans.y += DISTANCE * (bounceOut(anim) - 1.0);

        // Measure distance from (translated) origin
        d = length(uvTrans - vec2(0, 0));

        // Draw circle SDF
        col += vec3(step(d, SIZE));
    }

    // Output to screen
    fragColor = vec4(col, 1.0);
}
