// PARAMETERS
#define SPEED (3.0)
#define SIZE (0.6)
#define NUM_BALLS (7)
#define SPREAD (0.2)
#define BLUR (0.4)

#define PI 3.14159265359

float random(vec2 normSeed)
{
    return fract(sin(dot(normSeed.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 palette(float t)
{
    vec3 a = vec3(0.758, 0.288, 0.678); // DC Offset
    vec3 b = vec3(0.298, 0.375, 0.426); // Amp
    vec3 c = vec3(1.413, 0.878, 0.168); // Freq
    vec3 d = vec3(-0.292, 4.920, 0.176); // Phase

    return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;

    // Initialise black background colour
    vec3 col = vec3(0.0);

    float d;
    vec2 uvTrans;
    vec3 fill;

    // Iterate over balls
    for (int i = 0; i < NUM_BALLS; i++)
    {
        // Create translated uv for this ball
        uvTrans = uv;

        // Offset ball on x axis
        uvTrans.x += SPREAD * sin(iTime * (random(vec2(0.0, i)) - 0.5) * SPEED);

        // Measure distance from (translated) origin
        d = length(uvTrans - vec2(0, 0));

        // Create a random hue for this ball, animated over time
        fill = 0.5 * palette(float(i) * (2.0 / float(NUM_BALLS)) + iTime * 0.1 * SPEED);

        // Multiply fill colour by circle SDF
        col += fill * vec3(smoothstep(d, d + BLUR, SIZE));
    }

    // Taper brightness
    col = sin(min(col, PI * 0.5));

    // Output to screen
    fragColor = vec4(col, 1.0);
}
