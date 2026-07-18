import tkinter as tk

def calculate_bmi():
    weight = float(weight_entry.get())
    height = float(height_entry.get()) / 100
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        status = "Underweight"
        color = "#0D90E7"
    elif bmi < 25:
        status = "Healthy"
        color = "#CC2E65"
    elif bmi < 30:
        status = "Overweight"
        color = "#E67E22"
    else:
        status = "Obese"
        color = "#8911DF"
        
    result_label.config(
        text=f"BMI: {bmi:.1f} - {status}",
        fg=color
    )

window = tk.Tk()
window.title("BMI Calculator")
window.geometry("350x300")
window.configure(bg="#EBF5FB")

# Title
tk.Label(window, text="BMI Calculator", font=("Arial", 18, "bold"),
         bg="#EBF5FB").pack(pady=10)

# Weight
tk.Label(window, text="Weight (kg)", font=("Arial", 12), bg="#EBF5FB").pack()
weight_entry = tk.Entry(window, font=("Arial", 13), width=12, justify="center")
weight_entry.pack(pady=4)

# Height
tk.Label(window, text="Height (cm)", font=("Arial", 12), bg="#EBF5FB").pack()
height_entry = tk.Entry(window, font=("Arial", 13), width=12, justify="center")
height_entry.pack(pady=4)

# Button
tk.Button(window, text="Calculate", font=("Arial", 15, "bold"),
          bg="#2980B9", fg="white", command=calculate_bmi).pack(pady=10)

# Result Label
result_label = tk.Label(window, text="", font=("Arial", 15, "bold"), bg="#EBF5FB")
result_label.pack()

window.mainloop()
