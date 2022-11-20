var select = document.getElementById("attackSwitchSelect");

var option = document.createElement('option');
option.setAttribute('value', 'Enabled');
option.appendChild(document.createTextNode('Enabled'));
select.appendChild(option);

var option = document.createElement('option');
option.setAttribute('value', 'Disabled');
option.appendChild(document.createTextNode('Disabled'));
select.appendChild(option);

select.onchange('Enabled');

function attackSwitchChanged(select) {
    var act = document.getElementById('attackForm');
    if (select.value == "Enabled") {
        act.setAttribute('action', "https://localhost:3002/Home/VolunerableBalanceChange");
    }
    else {
        act.setAttribute('action', "https://localhost1:3002/Home/SafeBalanceChange");
    }
}



