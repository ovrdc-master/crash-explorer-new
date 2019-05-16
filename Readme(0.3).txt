Check OVRDC.org maps section for the examples of previous ones.

I have been compiling this in Dreamweaver for Adobe, but have not been making full use of the tool.

The "popup section needs to be rewritten into an html class, probably, but I'm trying to figure out how to make the map allow you to move through the different popups/crashes that occur at the same location

The page makes use of the material design template cyan blue. 

------
I switched to VS Code. It's working fine. Dreamweaver had some annoyances with some simple extensions for color picking.
Anyways, I can liveshare with people this way which is helpful.

Currently, the issues are more or less the same. I was able to get the sliders working thanks to Malcolm Meyer. I still don't have a work around for the popups.

The next issue is that the filters aren't working properly. I don't know what to do. The mapbox API uses a filter expression
https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers

The example they have uses deprecated features
https://docs.mapbox.com/mapbox-gl-js/example/query-similar-features/

Their current method, I think, doesn't require creating a layer on the fly. i have a map style that has a highlight layer on their app, but I'm currently trying to "build" a duplicate layer

The current status is completely broken nothing displays. Finally, a simple solution would be to create a different layer and switch map layers as needed.
This would run into a larger amount of code necessary however and I think would slow down loading. 

-------
Toggles should all be working at this point. Or, they could be if I duplicated the alcohol toggle a few more times. malcolm and I talked about wrapping it in a class, but I haven't decided yet

The current and more or less final issue before pushing it out to the website is the popups. I need to use the queryselectedfeature function (I think)
to count the number of features (Maybe it's feature.length?) being selected for the popup then I need to make a popup nav buttons in html to progress through the popups.

I think it may only be creating 1 popup currently.