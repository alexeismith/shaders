// https://iquilezles.org/articles/palettes/
// http://dev.thi.ng/gradients/

#define SPEED (0.3)

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
{
    return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;

    // Global speed control
    float time = iTime * SPEED;

    // Osillate frequency of gradient (as well as phase of red channel)
    float osc = 1.0 + 0.4 * (sin(time));
    // Animate phase of blue and green channels
    float phs = time * 0.2;

    vec3 a = vec3(0.5, 0.2, 0.5); // DC Offset
    vec3 b = vec3(0.2, 0.3, 0.6); // Amp
    vec3 c = vec3(osc, osc, osc); // Freq
    vec3 d = vec3(osc, phs, -phs); // Phase

    vec3 col = palette(uv.x, a, b, c, d);

    fragColor = vec4(col, 1.0);
}
