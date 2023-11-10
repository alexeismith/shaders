#define PI 3.14159265358

// PARAMS
#define RADIUS 0.4
#define FEATHER 0.01
#define NUM_POINTS 8

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Find distance of this pixel from centre pixel
    float d = length(uv - vec2(0.0, 0.0));

    // Define colour gradient
    vec3 col = mix(vec3(0.9, 0.9, 0.8), vec3(0.5, 0.7, 0.8), d);

    // atan measures angle around circle
    // Then, divide by 2pi to normalise within +-0.5
    // Then shift to +-1.0
    // col *= atan(uv.y, uv.x) / (2.0 * PI) + 0.5;
    
    // Use atan as input to cosine, to oscillate around circle
    // float r = RADIUS + 0.1*cos(atan(uv.y, uv.x) * float(NUM_POINTS));

    // Add a rotation
    // float r = RADIUS + 0.1*cos(atan(uv.y, uv.x) * float(NUM_POINTS) + iTime);
    
    // Define an oscillation
    float amp = 10.0 * (sin(iTime * 2.0));
    // Multiply the oscillation by the distance from the centre
    float r = RADIUS + 0.1*cos(atan(uv.y, uv.x) * float(NUM_POINTS) + iTime - d * amp);

    // Apply SDF to colour
    col *= smoothstep(r, r + FEATHER, d);

    fragColor = vec4(col, 1.0);
}