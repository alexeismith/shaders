#define PI 3.14159265359

// PARAMS
#define RADIUS 0.4
#define FEATHER 0.01
#define NUM_POINTS 8

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Find distance of this pixel from centre pixel
    float d = length(uv - vec2(0.0, 0.0));

    // Define colour gradient
    vec3 col = mix(vec3(0.9, 0.9, 0.8), vec3(0.5, 0.7, 0.8), d);

    // Step 1: To create star, measure angle around circle using atan
    // Divide by 2pi to normalise within +-0.5
    // Then shift to +-1.0
    // Uncomment to visualise:
    // col *= atan(uv.y, uv.x) / (2.0 * PI) + 0.5;

    // Step 2: Use atan as input to cosine, to oscillate around circle
    // float r = RADIUS + 0.1*cos(atan(uv.y, uv.x) * float(NUM_POINTS));

    // Step 3: Add a rotation
    // float r = RADIUS + 0.1*cos(atan(uv.y, uv.x) * float(NUM_POINTS) + iTime);

    // Step 4: Add another oscillation to wobble the star
    float wobble = 10.0 * (sin(iTime * 2.0));
    // Multiply the oscillation by the distance from the centre, to give the illusion of bending
    float r = RADIUS + 0.1 * cos(atan(uv.y, uv.x) * float(NUM_POINTS) + iTime + d * wobble);

    // Apply SDF to colour
    col *= smoothstep(r, r + FEATHER, d);

    fragColor = vec4(col, 1.0);
}
