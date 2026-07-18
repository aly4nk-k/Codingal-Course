import tkinter as tk

def say_hello():
    label.config(text="hello " + name_entry.get() + "!")

window = tk.Tk()
window.title("girls only")
window.geometry("400x300")
window.configure(bg="lightpink")

label = tk.Label(window, text="Enter your name", font=("arial", 20))
label.pack(pady=20)

name_entry = tk.Entry(window, font=("arial", 14), width=20)
name_entry.pack(pady=5)

tk.Button(window, text="Say Hello!", font=("arial", 14), bg="green",
          fg="white", command=say_hello).pack(pady=10)

label = tk.Label(window, text=" ", font=("arial", 16), bg="white")
label.pack(pady=10)

window.mainloop()
