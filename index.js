#!/usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let loop = true;
let answers1;
let answers2;
let answers3;
async function displayMenuItem() {
    answers1 = await inquirer.prompt([
        {
            type: "list",
            name: "menuOpt",
            choices: ['Add ToDo item', 'Edit ToDo item', 'Exit'],
            message: `Please select menu item: `
        }
    ]);
    switch (answers1.menuOpt) {
        case 'Add ToDo item': {
            await addTodo();
            break;
        }
        case 'Edit ToDo item': {
            await editTodo();
            break;
        }
        default: {
            loop = false;
            console.log("Ëxit Program.");
            break;
        }
    }
}
async function addTodo() {
    answers2 = await inquirer.prompt([
        {
            type: "input",
            name: "todo",
            message: "Enter What to Do? "
        }
    ]);
    todos.push(answers2.todo);
    console.log(todos);
}
async function editTodo() {
    if (todos.length > 0) {
        answers3 = await inquirer.prompt([
            {
                type: "list",
                name: "menuOpt",
                choices: todos,
                message: "Please select TODO for edit: "
            }
        ]);
        const item = await inquirer.prompt([
            {
                type: "input",
                name: "todo",
                message: `Please enter text to edit: `
            }
        ]);
        let i = 0;
        do {
            if (todos[i] === answers3.menuOpt) {
                todos[i] = item.todo;
                break;
            }
            i++;
        } while (i < todos.length);
        console.log(todos);
    }
    else {
        console.log("No todo item for edit.");
    }
}
async function startLoop() {
    while (loop) {
        await displayMenuItem();
    }
}
startLoop();
