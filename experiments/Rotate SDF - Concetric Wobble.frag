#define PI 3.14159265359

// https://iquilezles.org/articles/distfunctions2d/
float sdPentagon(in vec2 p, in float r)
{
    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);
    p.x = abs(p.x);
    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);
    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);
    p -= vec2(clamp(p.x, -r * k.z, r * k.z), r);
    return length(p) * sign(p.y);
}

// https://math.stackexchange.com/a/4031938/1291329
float sinSteep(in float x, in float steepness)
{
    return atan(steepness * sin(x)) / atan(steepness);
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec3 palette(float t)
{
    vec3 a = vec3(0.8, 0.5, 0.4);
    vec3 b = vec3(0.2, 0.4, 0.2);
    vec3 c = vec3(2.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.25, 0.25);

    return a + b * cos(6.28318 * (c * t + d));
}

// PARAMS
#define SCALE 0.07
#define ROT_SPEED 0.05
#define COLOUR_SPEED 0.1
#define COLOUR_GRAD_LENGTH 0.04
#define BRIGHTNESS 0.08
#define NUM_LAYERS 20

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;

    // Slowly rotate entire scene
    uv = rotateUV(uv, iTime * 0.03, vec2(0.0));

    // Initialise colour 
    vec3 col = vec3(0.0);

    // Steep sine animation
    float anim = sinSteep(iTime, 1.8) * 0.8;

    float shape;
    vec3 layerCol;

    // Iterate over layers
    for (int i = 1; i < NUM_LAYERS; i++)
    {
        // Rotate this layer
        // The rotation compounds as the loop continues
        uv = rotateUV(uv, anim * PI * ROT_SPEED, vec2(0.0));

        // Create pentagon SDF
        shape = sdPentagon(uv, float(i) * SCALE);
        shape = step(0.0, shape);
        shape = 1.0 - shape;

        // Set up colour for this layer
        layerCol = palette(iTime * COLOUR_SPEED + float(i) * COLOUR_GRAD_LENGTH);

        // Add layer to output colour
        col += BRIGHTNESS * shape * layerCol;
    }

    // Output to screen
    fragColor = vec4(col, 1.0);
}
