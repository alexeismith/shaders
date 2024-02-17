// https://www.shadertoy.com/view/MsjXRt
// Optimised version here: https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786

vec3 rotateHue(in vec3 col, in float rot)
{
    vec3 p = vec3(0.55735) * dot(vec3(0.55735), col);
    vec3 u = col - p;
    vec3 v = cross(vec3(0.55735), u);

    return u * cos(rot * 6.2832) + v * sin(rot * 6.2832) + p;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec3 col = vec3(1.0, 0.0, 0.0);

    col = rotateHue(col, iTime * 0.1);

    fragColor = vec4(col, 1.0);
}
