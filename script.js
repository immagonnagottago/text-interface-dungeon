const output = document.getElementById('output');
const commandInput = document.getElementById('command');

let location = 'entrance';

const rooms = {
    entrance: "You are at the dungeon entrance. Paths: north.",
    hall: "You are in a dark hall. Paths: south, east.",
    treasure: "You found the treasure room! Paths: west."
};

const moves = {
    entrance: { north: 'hall' },
    hall: { south: 'entrance', east: 'treasure' },
    treasure: { west: 'hall' }
};

function processCommand(cmd) {
    cmd = cmd.toLowerCase();
    if (cmd in moves[location]) {
        location = moves[location][cmd];
        output.textContent = rooms[location];
    } else {
        output.textContent = "You can't go that way!";
    }
}

commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        processCommand(commandInput.value);
        commandInput.value = '';
    }
});
