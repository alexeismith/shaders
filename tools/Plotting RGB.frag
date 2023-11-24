#define PI 3.14159265359

float plot (float x, float y){
    return (smoothstep(x-0.01, x, y) -
            smoothstep(x, x+0.01, y));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Some functions
    float fn_step = smoothstep(0.0, 1.0, uv.x);
    float fn_sin  = sin(uv.x * PI);
    float fn_pow  = pow(uv.x, 0.5);

    // Plot function on each colour channel
    vec3 color = vec3(0.0);
    color = mix(color, vec3(1.0,0.0,0.0), plot(fn_step, uv.y));
    color = mix(color, vec3(0.0,1.0,0.0), plot(fn_sin,  uv.y));
    color = mix(color, vec3(0.0,0.0,1.0), plot(fn_pow,  uv.y));

    fragColor = vec4(color,1.0);
}