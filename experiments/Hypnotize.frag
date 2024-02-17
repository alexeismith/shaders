// PARAMETERS
#define SPEED (0.5)
#define SPIRAL (1.5)
#define SIZE (0.13)

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Measure distance from centred origin
    float d = length(uv - vec2(0, 0));

    // Scale time based on parameter
    float time = SPEED * iTime;

    // Creating a pulse using time and sine wave
    float pulse = time + 0.04 * (sin(time * 10.0) + 1.0);
    // Uncomment this line to disable pulse:
    // pulse = time;

    // Animate distance from origin
    float anim1 = d - pulse * 0.1;
    float anim2 = d - pulse * 0.2;

    // Convert to concentric circles moving outwards
    anim1 = mod(anim1, SIZE) * 10.0;
    anim2 = mod(anim2, SIZE) * 10.0;

    // Animate colour components
    vec3 col = vec3(anim1, anim2, anim2);

    // Measure distance around circle circumference
    float a = atan(uv.y, uv.x);

    // Multiply green and blue components by animated spiral
    col.g *= 0.5 * (sin(a + (d * SPIRAL) - time * 5.0) + 1.0);
    col.b *= 0.5 * (sin(a + (d * SPIRAL) + time * 7.0) + 1.0);

    // Output to screen
    fragColor = vec4(col, 1.0);
}
