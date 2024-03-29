// https://iquilezles.org/articles/palettes/
// http://dev.thi.ng/gradients/

vec3 palette(float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5); // DC Offset
    vec3 b = vec3(0.5, 0.5, 0.5); // Amp
    vec3 c = vec3(1.0, 1.0, 1.0); // Freq
    vec3 d = vec3(0.0, 0.33, 0.66); // Phase

    return a + b * cos(6.28318 * (c * t + d));
}

// Parameterised version:
// vec3 col = palette(uv.x, a, b, c, d);
vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
{
    return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;

    vec3 col = palette(uv.x);

    fragColor = vec4(col, 1.0);
}
