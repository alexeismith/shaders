#define PI 3.14159265358

// https://iquilezles.org/articles/distfunctions2d/
float sdPentagon( in vec2 p, in float r )
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec3 palette( float t )
{
    vec3 a = vec3(0.8, 0.5, 0.4);
    vec3 b = vec3(0.2, 0.4, 0.2);
    vec3 c = vec3(2.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.25, 0.25);
    
    return a + b*cos( 6.28318*(c*t+d) );
}

// PARAMS
#define SCALE 0.07
#define ROT_SPEED 0.05
#define COLOUR_SPEED 0.1
#define COLOUR_GRAD_LENGTH 0.04
#define BRIGHTNESS 0.08

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalise resolution to +/-1 canvas with centred origin
    // Also account for aspect ratio to avoid stretching
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    vec3 col = vec3(0.0);

    float b;

    float s = cos(iTime);

    for (int i = 1; i < 20; i++)
    {
        uv = rotateUV(uv, s * PI * ROT_SPEED, vec2(0.0));
        
        b = sdPentagon(uv, float(i) * SCALE);
        b = step(0.0, b);
        b = 1.0 - b;

        col += BRIGHTNESS * b * palette(iTime * COLOUR_SPEED + float(i) * COLOUR_GRAD_LENGTH);
    }

    // Output to screen
    fragColor = vec4(col, 1.0);
}