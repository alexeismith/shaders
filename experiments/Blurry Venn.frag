// PARAMETERS
#define SPEED (0.5)
#define SIZE (0.7)
#define NUM_BALLS (6)
#define SPREAD (0.25)
#define BLUR (0.4)

#define PI 3.14159265359

float random(vec2 normSeed)
{
    return fract(sin(dot(normSeed.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 hsb2rgb(in vec3 c)
{
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb); // cubic smoothing
    return c.z * mix(vec3(1.0), rgb, c.y);
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

        // Create a random hue for this ball
        fill = hsb2rgb(vec3(random(vec2(i, 0.0)), 0.8, 0.55));
        // Attenuate green channel, to reduce whites when balls overlap
        fill.g *= 0.5;

        // Multiply fill colour by circle SDF
        col += fill * vec3(smoothstep(d, d + BLUR, SIZE));
    }

    // Taper brightness
    col = sin(min(col, PI * 0.5));

    // Output to screen
    fragColor = vec4(col, 1.0);
}
