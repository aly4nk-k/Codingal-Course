import tkinter as tk
window = tk.Tk()
window.title("My first app")
window.geometry("400x300")
window.configure(bg="lightblue")

label = tk.Label(window, text="hello grade 8", font=("arial", 20))
label.pack(pady=20)

window.mainloop()
