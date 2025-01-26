// PARAMETERS
#define SIZE (0.3)
#define RADIUS (0.4)
#define NUM_BALLS (20)
#define SPREAD (0.3)
#define BLUR (0.2)

#define PI 3.14159265359

vec3 hsb2rgb(in vec3 c)
{
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb); // cubic smoothing
    return c.z * mix(vec3(1.0), rgb, c.y);
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
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;

    // Initialise black background colour
    vec3 col = vec3(0.0);

    float offset, angle, d;
    vec2 uvTrans;
    vec3 fill;

    // Iterate over balls
    for (int i = 0; i < NUM_BALLS; i++)
    {
        // Create translated uv for this ball
        uvTrans = uv;

        offset = 0.002 * float(i * i);
        angle = PI * (sinSteep(mod(iTime - offset, PI) + 0.5 * PI, 3.5) + 1.0);

        // Convert polar coords to cartesian
        uvTrans.x += RADIUS * sin(angle);
        uvTrans.y += RADIUS * cos(angle);

        // Measure distance from (translated) origin
        d = length(uvTrans - vec2(0, 0));

        // Rainbow hue
        fill = hsb2rgb(vec3(float(i) * 0.03 + iTime * 0.05, 0.7, 0.35 - float(i) * 0.02));
        
        // Attenuate green channel for a more aesthetic palette
        fill.g *= 0.5;

        // Multiply fill colour by circle SDF
        col += fill * vec3(smoothstep(d, d + BLUR, SIZE));
    }

    // Taper brightness
    col = sin(min(col, PI * 0.5));

    // Output to screen
    fragColor = vec4(col, 1.0);
}
