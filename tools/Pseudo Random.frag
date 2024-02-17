// https://thebookofshaders.com/10/

// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

float random (vec2 normSeed)
{
    return fract(sin(dot(normSeed.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    float rnd = random(uv);

    gl_FragColor = vec4(vec3(rnd),1.0);
}