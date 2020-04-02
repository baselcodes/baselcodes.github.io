# PCD 2020 website

## SASS/SCSS

I suggest we use scss for the design of the website. Learn the basics [here](https://webdesign.tutsplus.com/courses/14-days-to-learn-sass/lessons/install-method-1-the-command-line) or [here](https://medium.com/web-development-articles/scss-basics-279ce9c0acb8).

You need a compiler to generate `css` from `scss` files. You can either use [CLI](https://sass-lang.com/install) for that or, if you work with Visual Studio, the `Live Sass Compiler`plugin
by ritwickdey.

### SASS/SCSS Folder Structure

The idea behind scss is to seperate the css into different files for a clearer structure and better co-working. Partial files always start with a underscrore (e.g. `_colors.scss`) .The `master.scss` imports all these files and creates the main css.

```
2020
│   index.html
│
└─── assets // folder for css, js, fonts, whatsoever
     │  
     │
     └─── css
     │   └─── _colors.scss  // color variables
     │   └─── _fonts.scss  // font variables, typography classes
     │   └─── _general.scss  // general styles like links, images, body, spaces
     │   └─── master.scss  // this file imports all the others & compiles the master.css
     │
     └─── fonts // lab mono by martin wecke
     │
     └─── js // your js scripts
```