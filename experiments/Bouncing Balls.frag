// PARAMETERS
#define SPEED (0.5)
#define DISTANCE (1.2)

float bounceOut(float t) {
  const float a = 4.0 / 11.0;
  const float b = 8.0 / 11.0;
  const float c = 9.0 / 10.0;

  const float ca = 4356.0 / 361.0;
  const float cb = 35442.0 / 1805.0;
  const float cc = 16061.0 / 1805.0;

  float t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    vec2 uvLeft = uv;
    uvLeft.x -= 0.3;

    vec2 uvRight = uv;
    uvRight.x += 0.3;

    // Animate value in range 0-1
    float anim1 = mod(iTime * SPEED, 1.0);
    float anim2 = mod(iTime * SPEED + 0.4, 1.0);

    // Translate y-axis using animation
    uvLeft.y += DISTANCE * (bounceOut(anim1) - 1.0);
    uvRight.y += DISTANCE * (bounceOut(anim2) - 1.0);

    // Measure distance from (translated) origin
    float dLeft = length(uvLeft - vec2(0,0));
    float dRight = length(uvRight - vec2(0,0));

    // Draw circle SDF
    vec3 col = vec3(step(dLeft, 0.1));
    col += vec3(step(dRight, 0.1));

    // Output to screen
    fragColor = vec4(col,1.0);
}