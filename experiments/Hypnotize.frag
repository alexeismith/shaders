// PARAMETERS
#define SPEED (0.5)
#define SPIRAL (1.5)

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Measure distance from centred origin
    float d = length(uv - vec2(0,0));

    // Scale time based on parameter
    float time = SPEED * iTime;

    // Creating a pulse using time and sine wave
    float pulse = time + 0.04 * (sin(time * 10.0) + 1.0);
    // Uncomment this line to disable pulse:
    // pulse = time;

    float anim1 = d - pulse * 0.1;
    float anim2 = d - pulse * 0.2;

    vec3 col = vec3(mod(anim1,0.1)*10.0,mod(anim2,0.1)*10.0,mod(anim2,0.1)*10.0);

    float a = atan(uv.y, uv.x);

    float mag1 = 0.5 * (sin(a + (d * SPIRAL) + time * 5.0) + 1.0);

    col.g *= 0.5 * (sin(a + (d * SPIRAL) - time * 5.0) + 1.0);
    col.b *= 0.5 * (sin(a + (d * SPIRAL) + time * 7.0) + 1.0);

    // Output to screen
    fragColor = vec4(col,1.0);
}