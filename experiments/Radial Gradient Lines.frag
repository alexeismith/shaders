#define PI 3.14159265359
#define SPEED 0.1

vec3 rotateHue(in vec3 col, in float rot)
{
    vec3 p = vec3(0.55735) * dot(vec3(0.55735), col);
    vec3 u = col - p;
    vec3 v = cross(vec3(0.55735), u);

    return u * cos(rot * 6.2832) + v * sin(rot * 6.2832) + p;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    // Store original uv
    vec2 uv0 = uv;

    // Create four quadrants
    uv = fract(uv);
    // Shift origin back to centre of quadrant
    uv -= 0.5;
    // Flip axes so that gadients meet nicely
    if (uv0.y < 0.0) uv.y *= -1.0;
    if (uv0.x < 0.0) uv.x *= -1.0;

    // Define red base colour
    vec3 red = vec3(0.5, 0.0, 0.0);
    // Oscillate hue
    red = rotateHue(red, 0.2 * sin(iTime * SPEED));

    // Red extends halfway around circle
    red *= -atan(uv.y, uv.x + 0.1) / (1.0 * PI) + 0.5;

    // Define blue base colour
    vec3 blue = vec3(0.0, 0.0, 0.5);
    // Oscillate hue
    blue = rotateHue(blue, 0.05 * sin(iTime * SPEED * 0.5));

    // Blue extends further
    blue *= -atan(uv.y, uv.x + 0.1) / (2.0 * PI) + 0.5;

    vec3 col = red + blue;
    col *= 1.05; // Adjust brightness

    fragColor = vec4(col, 1.0);
}
