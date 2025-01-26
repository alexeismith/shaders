#define PI 3.14159265359

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    float minres = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / minres;

    // Red base colour
    vec3 col = vec3(1.0, 0.0, 0.0);

    // Measure angle using atan
    // Divide by 2pi to normalise within +-0.5
    // Then shift to +-1.0
    col *= atan(uv.y, uv.x) / (2.0 * PI) + 0.5;

    fragColor = vec4(col, 1.0);
}
