#define PI 3.14159265359

vec3 plot (float x, float y) {
    float value = (smoothstep(x-0.01, x, y) -
                   smoothstep(x, x+0.01, y));

    return mix(vec3(0.0), vec3(1.0), value);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Some function
    float fn_sin  = sin(uv.x * PI);

    fragColor = vec4(plot(fn_sin, uv.y),1.0);
}