const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');

/*   /items routes    */
router.get('/', (req, res) => {
    console.log("Entered get route");
    return res.json(items);

});

router.post('/', (req, res) => {
    const newItem = req.body;
    console.log(newItem);
    items.push(newItem);
    return res.status(201).json({"added": newItem});
});


router.get('/:name', (req, res) => {
    console.log("Entered get route");
    const found = items.find(item => {
        // console.log(`\n\nSearching for: "${item.name}"`);    //debugging
        // console.log(item.name === req.params.name);          //debugging
        return item.name === req.params.name;
    })
    if (found === undefined) throw new ExpressError(`An item '${req.params.name}' doesn't exist`, 404);
    else {
        console.log(`Sending response: ${found}`);

        return res.status(200).json(found);
    }

});



router.patch('/:name', (req, res) => {
    //find the element for req.params.name in items
    //replace the element with new info
    const newInfo = req.body;
    const idx = items.indexOf(items.find(item => {
        // console.log(`\n\nSearching for: "${item.name}"`);    //debugging
        // console.log(item.name === req.params.name);          //debugging
        return item.name === req.params.name;
    }))
    if (idx === undefined) throw new ExpressError(`An item '${req.params.name}' doesn't exist`, 404);
    else {
        items[idx] = newInfo;
        return res.status(202).json({"updated":items[idx]});
    }

})


router.delete('/:name', (req, res) => {
    //find the element for req.params.name in items
    //replace the element with new info
    const idx = items.indexOf(items.find(item => {
        // console.log(`\n\nSearching for: "${item.name}"`);    //debugging
        // console.log(item.name === req.params.name);          //debugging
        return item.name === req.params.name;
    }))
    if (idx === undefined) throw new ExpressError(`An item '${req.params.name}' doesn't exist`, 404);
    else {
        items.splice(idx, 1);
        return res.status(200).json({"message":"Deleted"});
    }

})


module.exports = router;