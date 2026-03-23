function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
document.addEventListener("DOMContentLoaded", function () {
  const chartContainer = document.querySelector(".chart-container");
  const chartCanvas = document.getElementById("appointmentChart");
  if (!chartCanvas) {
    console.error("Chart canvas not found");
    return;
  }

  const ctx = chartCanvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, "#5541D7");
  gradient.addColorStop(1, "rgba(85, 65, 215, 0)");
  const appointmentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Appointments",
          data: [
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
            getRandomInt(0, 101),
          ],
          borderColor: "#5541D7",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: "#5541D7",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(51, 51, 51, 0.8)",
          padding: 12,
          borderRadius: 6,
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          displayColors: false,
          callbacks: {
            label: function (context) {
              return "Appointments: " + context.parsed.y;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "#e8e8e8",
            drawBorder: false,
            lineWidth: 1,
          },
          ticks: {
            color: "#999",
            font: { size: 12 },
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#999",
            font: { size: 12 },
          },
        },
      },
    },
  });
});
