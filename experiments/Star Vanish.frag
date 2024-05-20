// PARAMETERS
#define SPEED (0.5)
#define SIZE (0.1)
#define NUM_BALLS (40)

// TODO: make this into a "vanishing point" shader, where distance from the centre increases a multiplier
// The maximum value of the multiplier controls the perspective
// The multiplier is used to offset the point from the centre, with it decreasing from 1x mult to 0x mult
// - maybe there could also be a constant offset?
// To make it look like stars, the size differences/changes must be small

float cubicIn(float t) {
  return t * t * t;
}

float random(vec2 normSeed)
{
    return fract(sin(dot(normSeed.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uvOrigin = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    uvOrigin.x = abs(uvOrigin.x);

    vec3 col = vec3(0.0);

    vec2 uv;

    for (int i = 0; i < NUM_BALLS; i++) {
        uv = uvOrigin;
        uv.y -= 1.0;

        // Animate value in range 0-1
        float anim = cubicIn(mod(-iTime * SPEED + random(vec2(i, i)), 1.0));
        // anim = mod(anim + float(i) * 0.1, 1.0);

        uv.y += float(i * 2) / float(NUM_BALLS);

        // Translate y-axis using animation
        uv.x -= anim * (1.0 + random(vec2(i, i)));
        uv *= 1.0 / (anim * random(vec2(i, i)));

        // Measure distance from (translated) origin
        float d = length(uv - vec2(0, 0));

        // Draw circle SDF
        // To create white ball, arguments to step function are reversed
        col += vec3(step(d, SIZE));
    }

    // col = fract(col);

    // Output to screen
    fragColor = vec4(col, 1.0);
}
