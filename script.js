document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');

    let location = 'entrance';
    let inventory = [];

    const rooms = {
        entrance: {
            description: "You are at the dungeon entrance. Paths: north.",
            items: []
        },
        hall: {
            description: "You are in a dark hall. Paths: south, east. You see a key on the floor.",
            items: ['key']
        },
        treasure: {
            description: "You found the treasure room! Paths: west. There's a locked chest here.",
            items: ['chest']
        }
    };

    const moves = {
        entrance: { north: 'hall' },
        hall: { south: 'entrance', east: 'treasure' },
        treasure: { west: 'hall' }
    };

    function processCommand(cmd) {
        cmd = cmd.toLowerCase().trim();

        if (cmd in moves[location]) {
            // Move to another room
            location = moves[location][cmd];
            showRoom();
        } else if (cmd.startsWith('take ')) {
            let item = cmd.slice(5);
            if (rooms[location].items.includes(item)) {
                inventory.push(item);
                rooms[location].items = rooms[location].items.filter(i => i !== item);
                output.textContent = `You took the ${item}.`;
            } else {
                output.textContent = `There is no ${item} here.`;
            }
        } else if (cmd === 'inventory') {
            output.textContent = inventory.length ? `Inventory: ${inventory.join(', ')}` : "Your inventory is empty.";
        } else if (cmd === 'open chest') {
            if (location === 'treasure') {
                if (inventory.includes('key')) {
                    output.textContent = "You opened the chest and found the treasure! You win!";
                } else {
                    output.textContent = "The chest is locked. You need a key.";
                }
            } else {
                output.textContent = "There is no chest here.";
            }
        } else {
            output.textContent = "Unknown command.";
        }
    }

    function showRoom() {
        let room = rooms[location];
        let itemsText = room.items.length ? `You see: ${room.items.join(', ')}` : '';
        output.textContent = `${room.description}\n${itemsText}`;
    }

    // Initial room display
    showRoom();

    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processCommand(commandInput.value);
            commandInput.value = '';
        }
    });
});
