// Very simple function for normalising RGB from range 0-255

// Tip: install Windows PowerToys, then press WIN+SHIFT+C to use the colour picker
// Click on a pixel and copy the rgb string, which matches this function!

vec3 rgb(in int r, in int g, in int b)
{
    return vec3(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec3 col = rgb(250, 200, 150);

    // Output to screen
    fragColor = vec4(col, 1.0);
}
