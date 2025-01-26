// PARAMETERS
#define SPEED (0.5)
#define SIZE (0.6)
#define NUM_BALLS (5)
#define SPREAD (0.3)
#define BLUR (0.2)

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

vec3 rgb2hsb(in vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// https://math.stackexchange.com/a/4031938/1291329
float sinSteep(in float x, in float steepness)
{
    return atan(steepness * sin(x)) / atan(steepness);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Initialise black background colour
    vec3 col = vec3(0.0);

    float r, angle, d;
    vec2 uvTrans;
    vec3 fill;

    // Iterate over balls
    for (int i = 0; i < NUM_BALLS; i++)
    {
        // Create translated uv for this ball
        uvTrans = uv;

        // Create radius to offset ball from origin
        r = SPREAD;

        // Initialise angle to rotate ball around origin
        angle = 2.0 * PI * random(vec2(i, 0.0));
        // Animate angle by randomly scaling iTime
        angle += iTime * (random(vec2(0.0, i)) - 0.5) * SPEED;

        // Convert polar coords to cartesian
        uvTrans.x += r * cos(angle);
        uvTrans.y += r * sin(angle);

        // Measure distance from (translated) origin
        d = length(uvTrans - vec2(0, 0));

        // Create a random hue for this ball
        fill = hsb2rgb(vec3(random(vec2(i, 0.0)), 0.8, 0.6));
        // Attenuate green channel, to reduce whites when balls overlap
        // fill.g *= 0.5;

        // Multiply fill colour by circle SDF
        col += fill * vec3(smoothstep(d, d + BLUR, SIZE));
    }

    // Taper brightness
    col = sin(min(col, PI * 0.5));

    // Simple invert
    // col = vec3(1.0) - col;

    vec3 invert = vec3(1.0) - col;
    col = mix(col, invert, 0.5 * (sinSteep(iTime * 0.5, 20.0) + 1.0));

    // Output to screen
    fragColor = vec4(col, 1.0);
}
