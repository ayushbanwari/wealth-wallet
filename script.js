function updatePercentageDisplay() {
    // Retrieve values from sliders
    const needsSlider = parseInt(document.getElementById('needs-slider').value);
    const wantsSlider = parseInt(document.getElementById('wants-slider').value);
    const savingsSlider = parseInt(document.getElementById('savings-slider').value);

    // Calculate total percentage and rounding error
    const totalPercentage = needsSlider + wantsSlider + savingsSlider;
    const roundingError = 100 - totalPercentage;

    // Update displayed percentages
    document.getElementById('needs-percentage-display').textContent = needsSlider + '%';
    document.getElementById('wants-percentage-display').textContent = wantsSlider + '%';
    document.getElementById('savings-percentage-display').textContent = savingsSlider + '%';

    // Retrieve income per paycheck
    let incomePerPaycheck = 0;
    
    const incomeInput = document.getElementById('income-per-paycheck').value;
    if (incomeInput.trim() !== '') {
        incomePerPaycheck = parseFloat(incomeInput);
    }

    // Calculate and update amounts next to sliders
    const needsAmount = (needsSlider / 100) * incomePerPaycheck;
    const wantsAmount = (wantsSlider / 100) * incomePerPaycheck;
    const savingsAmount = (savingsSlider / 100) * incomePerPaycheck;
    
    document.getElementById('needs-amount-display').textContent = '$' + needsAmount.toFixed(0);
    document.getElementById('wants-amount-display').textContent = '$' + wantsAmount.toFixed(0);
    document.getElementById('savings-amount-display').textContent = '$' + savingsAmount.toFixed(0);

    // If rounding error exists, distribute it proportionally among the sliders
    if (roundingError !== 0) {
        const needsAdjustment = (needsSlider / totalPercentage) * roundingError;
        const wantsAdjustment = (wantsSlider / totalPercentage) * roundingError;
        const savingsAdjustment = (savingsSlider / totalPercentage) * roundingError;

        // Adjust slider values
        document.getElementById('needs-slider').value = Math.min(100, needsSlider + needsAdjustment);
        document.getElementById('wants-slider').value = Math.min(100, wantsSlider + wantsAdjustment);
        document.getElementById('savings-slider').value = Math.min(100, savingsSlider + savingsAdjustment);

        // Update displayed percentages after adjustment
        document.getElementById('needs-percentage-display').textContent = document.getElementById('needs-slider').value + '%';
        document.getElementById('wants-percentage-display').textContent = document.getElementById('wants-slider').value + '%';
        document.getElementById('savings-percentage-display').textContent = document.getElementById('savings-slider').value + '%';

        // Update amounts after adjustment
        const adjustedNeedsAmount = (document.getElementById('needs-slider').value / 100) * incomePerPaycheck;
        const adjustedWantsAmount = (document.getElementById('wants-slider').value / 100) * incomePerPaycheck;
        const adjustedSavingsAmount = (document.getElementById('savings-slider').value / 100) * incomePerPaycheck;

        document.getElementById('needs-amount-display').textContent = '$' + adjustedNeedsAmount.toFixed(0);
        document.getElementById('wants-amount-display').textContent = '$' + adjustedWantsAmount.toFixed(0);
        document.getElementById('savings-amount-display').textContent = '$' + adjustedSavingsAmount.toFixed(0);
    }

    // Update the total percentage displayed at the bottom
    document.getElementById('total-percentage-display').textContent = 100 + '%';
}

// Function to handle slider changes
function handleSliderChange(sliderId) {
    const slider = document.getElementById(sliderId);
    const displayId = `${sliderId}-display`;
    const amountDisplayId = `${sliderId}-amount`;  // Add this line

    // Update the displayed percentage
    document.getElementById(displayId).textContent = `${slider.value}%`;

    // Update the slider amounts
    const monthlySalary = parseFloat(document.getElementById('income-per-paycheck').value);
    const percentage = parseInt(slider.value);
    const amount = (percentage / 100) * monthlySalary;


    // Update the displayed amount
    document.getElementById(amountDisplayId).textContent = `$${amount.toFixed(2)}`;  // Add this line

    // Update the pie chart
    updatePieChart();

    // Update the total percentages and handle rounding errors
    updatePercentageDisplay();
}

// Function to update slider amounts based on income
function updateSliderAmounts() {
    // Retrieve monthly salary
    const monthlySalary = parseFloat(document.getElementById('income-per-paycheck').value);
    
    // Retrieve percentage values from sliders
    const needsPercentage = parseInt(document.getElementById('needs-slider').value);
    const wantsPercentage = parseInt(document.getElementById('wants-slider').value);
    const savingsPercentage = parseInt(document.getElementById('savings-slider').value);

   	// Calculate amounts based on percentages
    const needsAmount = (needsPercentage / 100) * monthlySalary;
    const wantsAmount = (wantsPercentage / 100) * monthlySalary;
    const savingsAmount = (savingsPercentage / 100) * monthlySalary;

    // Update displayed amounts
    document.getElementById('needs-amount').textContent = `$${needsAmount.toFixed(2)}`;
    document.getElementById('wants-amount').textContent = `$${wantsAmount.toFixed(2)}`;
    document.getElementById('savings-amount').textContent = `$${savingsAmount.toFixed(2)}`;
}

// Add event listener to the income per paycheck input field
document.getElementById('income-per-paycheck').addEventListener('input', function() {
    // Retrieve the entered income per paycheck value
    const incomePerPaycheck = parseFloat(this.value);

    // Check if the entered value is a valid number
    if (!isNaN(incomePerPaycheck)) {
        // Retrieve the slider amount display elements
        const needsAmountDisplay = document.getElementById('needs-amount-display');
        const wantsAmountDisplay = document.getElementById('wants-amount-display');
        const savingsAmountDisplay = document.getElementById('savings-amount-display');

        // Update the slider amount display text content based on the entered income per paycheck value
        const needsPercentage = parseFloat(document.getElementById('needs-slider').value);
        const wantsPercentage = parseFloat(document.getElementById('wants-slider').value);
        const savingsPercentage = parseFloat(document.getElementById('savings-slider').value);

        needsAmountDisplay.textContent = `$${(needsPercentage / 100 * incomePerPaycheck).toFixed(0)}`;
        wantsAmountDisplay.textContent = `$${(wantsPercentage / 100 * incomePerPaycheck).toFixed(0)}`;
        savingsAmountDisplay.textContent = `$${(savingsPercentage / 100 * incomePerPaycheck).toFixed(0)}`;
    } else {
        // If the entered value is not a valid number, set the displayed amounts to 0
        document.getElementById('needs-amount-display').textContent = '$0';
        document.getElementById('wants-amount-display').textContent = '$0';
        document.getElementById('savings-amount-display').textContent = '$0';
    }
});

// Function to submit targets
function submitTargets() {
    let incomePerPaycheck = 0;

    const needsTarget = parseInt(document.getElementById('needs-slider').value);
    const wantsTarget = parseInt(document.getElementById('wants-slider').value);
    const savingsTarget = parseInt(document.getElementById('savings-slider').value);

    // Retrieve income per paycheck
    const incomeInput = document.getElementById('income-per-paycheck').value;
    if (incomeInput.trim() !== '') {
        incomePerPaycheck = parseFloat(incomeInput);
    }

    // Calculate amounts based on the percentages
    const needsAmount = (needsTarget / 100) * incomePerPaycheck;
    const wantsAmount = (wantsTarget / 100) * incomePerPaycheck;
    const savingsAmount = (savingsTarget / 100) * incomePerPaycheck;

    // Display selected targets and calculated amounts in the Expense Chart tab
    document.getElementById('needs-target-display').textContent = needsTarget + '% [ $' + needsAmount.toFixed(0) + ' ]';
    document.getElementById('wants-target-display').textContent = wantsTarget + '% [ $' + wantsAmount.toFixed(0) + ' ]';
    document.getElementById('savings-target-display').textContent = savingsTarget + '% [ $' + savingsAmount.toFixed(0) + ' ]';

    // Update the Expense Chart (you need to implement this part)
    updateExpenseChart(needsTarget, wantsTarget, savingsTarget);
    compareExpensesWithTargets();

    // Provide instructions for the user
    alert('Targets submitted! Press the "Summary" tab to view the updated chart.');
}

// Function to update the Expense Chart with targets
function updateExpenseChart(needsPercentage, wantsPercentage, savingsPercentage) {
    // Update the Expense Chart with targets
    console.log('Needs Percentage:', needsPercentage, 'Target:', document.getElementById('needs-percentage-display').textContent);
    console.log('Wants Percentage:', wantsPercentage, 'Target:', document.getElementById('wants-percentage-display').textContent);
    console.log('Savings Percentage:', savingsPercentage, 'Target:', document.getElementById('savings-percentage-display').textContent);

    // Implement code here to update the pie chart based on the percentages
    updatePieChart(needsPercentage, wantsPercentage, savingsPercentage);
}

// Function to update the pie chart
function updatePieChart() {
    // Get the total expenses for each category dynamically
    const totalNeeds = getTotalExpensesByCategory('Needs');
    const totalWants = getTotalExpensesByCategory('Wants');
    const totalSavings = getTotalExpensesByCategory('Savings');

    // Calculate total expenses
    const totalExpenses = totalNeeds + totalWants + totalSavings;

    // Calculate percentages for each category
    const needsPercentage = totalExpenses ? (totalNeeds / totalExpenses) * 100 : 0;
    const wantsPercentage = totalExpenses ? (totalWants / totalExpenses) * 100 : 0;
    const savingsPercentage = totalExpenses ? (totalSavings / totalExpenses) * 100 : 0;

    // Get the canvas element where you want to render the pie chart
    const pieChartCanvas = document.getElementById('pie-chart');

    // Create a data array based on the percentages
    const data = {
        labels: ['Needs', 'Wants', 'Savings'],
        datasets: [{
            data: [needsPercentage, wantsPercentage, savingsPercentage],
            backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
        }],
    };

    // Create or update the pie chart
    if (window.myPieChart) {
        // Update existing chart
        window.myPieChart.data.datasets.forEach((dataset) => {
            dataset.data = [needsPercentage, wantsPercentage, savingsPercentage];
        });
        window.myPieChart.update();
    } else {
        // Create new chart
        window.myPieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: data,
        });
    }
}

// Function to get total expenses for a specific category
function getTotalExpensesByCategory(category) {
    // Get the table body element
    const expensesTableBody = document.getElementById('expenses-list');

    // Filter table rows by category and sum the expenses
    return Array.from(expensesTableBody.querySelectorAll('tr'))
        .filter(row => row.cells[2].textContent === category)
        .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);
}

// Function to add a new expense
function addExpense() {
    // Retrieve input values
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');
    const categorySelect = document.getElementById('expense-category');
    const expensesTableBody = document.getElementById('expenses-list');
    const subtotalAmount = document.getElementById('subtotal-amount');

    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    // Validate input
    if (name && !isNaN(amount) && amount > 0) {
        // Insert new row in the table
        const row = expensesTableBody.insertRow(0);
        const nameCell = row.insertCell(0);
        const amountCell = row.insertCell(1);
        const categoryCell = row.insertCell(2);
        const actionCell = row.insertCell(3);

        // Populate cells with data
        nameCell.textContent = name;
        amountCell.textContent = `$${amount.toFixed(2)}`;
        categoryCell.textContent = category;
        actionCell.innerHTML = `<button class="remove-button" onclick="removeExpenseRow(this)">Remove</button>`;

        // Update subtotal
        const currentSubtotal = parseFloat(subtotalAmount.textContent);
        subtotalAmount.textContent = (currentSubtotal + amount).toFixed(2);

        // Update expense summary
        updateExpenseSummary();
        compareExpensesWithTargets();

        // Clear input fields
        nameInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please enter valid expense details.');
    }
}

// Function to remove an expense row
function removeExpenseRow(button) {
    // Retrieve row and amount
    const row = button.closest('tr');
    const amount = parseFloat(row.cells[1].textContent.substring(1));

    // Update subtotal
    const subtotalAmount = document.getElementById('subtotal-amount');
    const currentSubtotal = parseFloat(subtotalAmount.textContent);
    subtotalAmount.textContent = (currentSubtotal - amount).toFixed(2);

    // Remove the row
    row.remove();

    // Update expense summary
    updateExpenseSummary();
    compareExpensesWithTargets();
}

// Function to update expense summary
function updateExpenseSummary() {
    // Retrieve subtotal amount
    const subtotalAmount = parseFloat(document.getElementById('subtotal-amount').textContent);

    // Retrieve percentage elements
    const needsPercentageElement = document.getElementById('needs-percentage');
    const wantsPercentageElement = document.getElementById('wants-percentage');
    const savingsPercentageElement = document.getElementById('savings-percentage');

    if (subtotalAmount > 0) {
        // Calculate total amounts for each category
        const needsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
            .filter(row => row.cells[2].textContent === 'Needs')
            .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

        const wantsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
            .filter(row => row.cells[2].textContent === 'Wants')
            .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

        const savingsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
            .filter(row => row.cells[2].textContent === 'Savings')
            .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

        // Calculate percentages
        const needsPercentage = parseFloat(((needsTotal / subtotalAmount) * 100).toFixed(0));
        const wantsPercentage = parseFloat(((wantsTotal / subtotalAmount) * 100).toFixed(0));
        const savingsPercentage = parseFloat(((savingsTotal / subtotalAmount) * 100).toFixed(0));

        // Display percentages
        needsPercentageElement.textContent = `${needsPercentage}% [ $${needsTotal} ]`;
        wantsPercentageElement.textContent = `${wantsPercentage}% [ $${wantsTotal} ]`;
        savingsPercentageElement.textContent = `${savingsPercentage}% [ $${savingsTotal} ]`;
    } else {
        // If subtotal is zero, set percentages to zero
        needsPercentageElement.textContent = '0%';
        wantsPercentageElement.textContent = '0%';
        savingsPercentageElement.textContent = '0%';
    }

    // Update the Expense Chart with the new percentages
    updatePieChart(
        parseFloat(needsPercentageElement.textContent),
        parseFloat(wantsPercentageElement.textContent),
        parseFloat(savingsPercentageElement.textContent)
    );
}

// Function to show a specific tab and hide others
function showTab(tabName) {
    // List of tabs
    const tabs = ['instructions', 'setUp', 'addExpenses', 'expenseChart'];

    // Show/hide tabs
    tabs.forEach(tab => {
        const tabContent = document.getElementById(tab);
        if (tab === tabName) {
            tabContent.style.display = 'block';
        } else {
            tabContent.style.display = 'none';
        }
    });

    // Update financial tips
    updateFinancialTips();
}

// Function to update financial tips with animation
function updateFinancialTips() {
    const tipsContent = document.getElementById('tips-content');

    // Remove and re-add animation
    tipsContent.style.animation = 'none';
    void tipsContent.offsetWidth;
    tipsContent.style.animation = null;
}

// Initial setup when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Show the Instructions tab by default
    showTab('instructions');

    // Load financial tips
    loadFinancialTips();
});

// Function to load financial tips
function loadFinancialTips() {
    const tipsContent = document.getElementById('tips-content');
    tipsContent.textContent = 'Loading financial bangers...';

    // Array of Gen Z financial tips
    const FinancialTips = [
        '401(k) is the adult version of getting XP points for your character.',
        'Emergency fund: Because life throws unexpected plot twists. Character Development!',
        'Money can not buy happiness, but it can buy snacks. And that is pretty much the same thing.',
        'Money is not the most important thing in the world. Love is. Fortunately, I love money. -Jackie Mason',
        'The safest way to double your money is to fold it over and put it in your pocket. -Kin Hubbard',
        'A bank is a place that will lend you money if you can prove that you do not need it. -Bob Hope',
        'The trick is to stop thinking of it as your money. -IRS auditor',
        'Student loans are the final boss battle of education',
        'Financial independence is the ultimate achievement. You are grinding for freedom!',
        'Who needs a Lambo when you can have a solid credit score?',
        'More Money more Problems? Bring on the problems -Drake',
        'Savings accounts are like the side quests of adulthood. Complete them for extra coins!',
        'Anyone who lives within their means suffers from a lack of imagination.” -Oscar Wilde',
        'I get up and look through a list of richest people in America. If I am not there, I get to work. -Robert Orben',
        'I used to be a baker because I kneaded dough. Now, I just need dough',
        'I am not lazy; I am in energy-saving mode to reduce my electricity bill',
        'Financial humor is best enjoyed in moderation - unlike your investment portfolio, which should be diversified',
        'My retirement plan is basically praying that Social Security will still be a thing by the time I am ready to retire',
        'I am not a financial expert, but my 401(k) balance is proof that I have at least dabbled in adulting',
        'My Roth IRA and I have a mutual understanding: I invest in it, and it promises not to judge my impulsive shopping habits',
        'Wants are the appetizers of life; needs are the main course. Savings? That is the dessert you enjoy guilt-free',
        'I am not broke; I am just pre-rich',
        'They say money talks, but mine just waves goodbye as it leaves my wallet',
        'My hobbies include calculating the cost per square of toilet paper',
        'My wallet is like an onion. Every time I open it, I cry a little',
        'My idea of investing is buying a lottery ticket and hoping for the best.',
        'They say laughter is the best medicine. Clearly, they never tried paying medical bills with a joke.'
    ];

    // Shuffle the array
    const shuffledTips = shuffleArray(FinancialTips);

    // Display tips every few seconds
    let tipIndex = 0;
    const tipInterval = setInterval(() => {
        if (tipIndex < shuffledTips.length) {
            tipsContent.textContent = shuffledTips[tipIndex];
            tipIndex++;
        } else {
            clearInterval(tipInterval);
        }
    }, 10000); // Adjust as needed
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to compare actual expenses with targets and display a message
function compareExpensesWithTargets() {

    const needsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
    .filter(row => row.cells[2].textContent === 'Needs')
    .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

    const wantsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
        .filter(row => row.cells[2].textContent === 'Wants')
        .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

    const savingsTotal = Array.from(document.querySelectorAll('#expenses-list tr'))
        .filter(row => row.cells[2].textContent === 'Savings')
        .reduce((total, row) => total + parseFloat(row.cells[1].textContent.substring(1)), 0);

    const needsTarget = parseInt(document.getElementById('needs-slider').value);
    const wantsTarget = parseInt(document.getElementById('wants-slider').value);
    const savingsTarget = parseInt(document.getElementById('savings-slider').value);

    // Retrieve income per paycheck
    const incomePerPaycheck = parseFloat(document.getElementById('income-per-paycheck').value);

    // Calculate amounts based on the percentages
    const needsAmount = (needsTarget / 100) * incomePerPaycheck;
    const wantsAmount = (wantsTarget / 100) * incomePerPaycheck;
    const savingsAmount = (savingsTarget / 100) * incomePerPaycheck;

    // Compare actual expenses with targets and display messages
    compareAndDisplayMessage('Needs', needsTotal, needsAmount);
    compareAndDisplayMessage('Wants', wantsTotal, wantsAmount);
    compareAndDisplayMessage('Savings', savingsTotal, savingsAmount);
}

// Function to compare and display a message
function compareAndDisplayMessage(category, actualPercentage, targetPercentage) {
    const expenseDifference = actualPercentage - targetPercentage;
    const expenseMessageElement = document.getElementById(`${category.toLowerCase()}-message`);

    if (expenseDifference > 0 && category == 'Savings') {
        expenseMessageElement.textContent = `${category} above target by $${expenseDifference.toFixed(0)}`;
        expenseMessageElement.style.color = 'green'; // You can customize the styling
    } else if (expenseDifference > 0) {
        // Actual expenses are too high
        expenseMessageElement.textContent = `${category} above target by $${expenseDifference.toFixed(0)}`;
        expenseMessageElement.style.color = 'red'; // You can customize the styling
    } else if (expenseDifference < 0 && category == 'Savings') {
        expenseMessageElement.textContent = `${category}   below   target   by   $${expenseDifference.toFixed(0)}`;
        expenseMessageElement.style.color = 'red'; // You can customize the styling
    } else if (expenseDifference < 0) {
        // Actual expenses are too low
        expenseMessageElement.textContent = `${category}   below   target   by   $${Math.abs(expenseDifference).toFixed(0)}`;
        expenseMessageElement.style.color = 'green'; // You can customize the styling
    } else {
        // Actual expenses are on target
        expenseMessageElement.textContent = `${category}  on  target`;
        expenseMessageElement.style.color = 'black'; // You can customize the styling
    }
}

// Function to populate dropdown with months
function populateMonthDropdown() {
    const monthSelect = document.getElementById('month-select');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let month of months) {
        let option = document.createElement('option');
        option.value = month;
        option.text = month;
        monthSelect.appendChild(option);
    }
}

// Call the function when the page loads
window.onload = function() {
    populateMonthDropdown();
};

// Function to save current month's data and move to the next month
function saveCurrentMonth() {
    // Get the selected month from the dropdown
    const monthSelect = document.getElementById('month-select');
    const currentMonth = monthSelect.value;

    takeScreenshot(currentMonth);

    // Move to the next month
    const currentMonthIndex = monthSelect.selectedIndex;
    const nextMonthIndex = currentMonthIndex + 1;
    if (nextMonthIndex < monthSelect.options.length) {
        monthSelect.selectedIndex = nextMonthIndex;
    } else {
        monthSelect.selectedIndex = 0;
    }

    resetData(monthSelect.value);
}

function takeScreenshot(month) {
    alert(`Summary for ${month} saved successfully!`);

    // Get the Expense Chart tab content
    const expenseChartContent = document.getElementById('expenseChart');

    // Use html2canvas to capture the screenshot
    html2canvas(expenseChartContent).then(canvas => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL();

        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${month}_Expense_Screenshot.png`; // Customize the filename
        link.click();
    });
}

// Function to reset month data (customize as needed for each month)
function resetData(month) {

    // Reset the displayed amounts to zero
    document.getElementById('needs-amount-display').textContent = '$0';
    document.getElementById('wants-amount-display').textContent = '$0';
    document.getElementById('savings-amount-display').textContent = '$0';

    // Remove all expenses
    const expensesTableBody = document.getElementById('expenses-list');
    while (expensesTableBody.firstChild) {
        expensesTableBody.removeChild(expensesTableBody.firstChild);
    }

    // Reset subtotal amount
    document.getElementById('subtotal-amount').textContent = '0.00';

    // Reset expense summary
    document.getElementById('needs-percentage').textContent = '0%';
    document.getElementById('wants-percentage').textContent = '0%';
    document.getElementById('savings-percentage').textContent = '0%';

    document.getElementById('needs-target-display').textContent = '0%';
    document.getElementById('wants-target-display').textContent = '0%';
    document.getElementById('savings-target-display').textContent = '0%';

    // Reset expense messages
    document.getElementById('needs-message').textContent = '';
    document.getElementById('wants-message').textContent = '';
    document.getElementById('savings-message').textContent = '';

    // Update pie chart and exit function
    updatePieChart();
}

document.getElementById('needs-tooltip').setAttribute('data-tooltip', 'Essential expenses like rent, insurance, groceries, and utilities.');
document.getElementById('wants-tooltip').setAttribute('data-tooltip', 'Non-essential expenses for leisure and entertainment.');
document.getElementById('savings-tooltip').setAttribute('data-tooltip', 'Funds set aside for future goals and emergencies.');

// Tools used: CHATGPT