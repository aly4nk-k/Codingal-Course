import tkinter as tk
from tkinter import messagebox

# Quiz question dataset
question = [
    {
        'q': 'Which is the largest ocean on Earth?',
        'options': ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        'ans': 'Pacific Ocean'
    },
    {
        'q': 'How many bones are there in an adult human body?',
        'options': ['206', '208', '212', '196'],
        'ans': '206'
    },
    {
        'q': 'Which country is home to the Kangaroo?',
        'options': ['South Africa', 'Australia', 'New Zealand', 'Austria'],
        'ans': 'Australia'
    },
    {
        'q': 'What is the hardest natural substance on Earth?',
        'options': ['Gold', 'Iron', 'Diamond', 'Quartz'],
        'ans': 'Diamond'
    },
    {
        'q': 'Which element has the chemical symbol "O"?',
        'options': ['Gold', 'Oxygen', 'Osmium', 'Zinc'],
        'ans': 'Oxygen'
    }
]

# Global game variables
current_q = 0
score = 0
time_left = 45
timer_job = None  


def start_game():
    """Removes the welcome screen and loads the first question."""
    welcome_frame.pack_forget()
    result_frame.pack_forget()  
    game_frame.pack(fill="both", expand=True)
    load_question()


def reset_game():
    """Resets game variables to start fresh."""
    global current_q, score, time_left, timer_job
    if timer_job:
        window.after_cancel(timer_job)
        timer_job = None
    current_q = 0
    score = 0
    time_left = 45
    start_game()


def update_timer():
    """Handles the 45-second countdown mechanics."""
    global time_left, timer_job
    if time_left > 0:
        time_left -= 1
        timer_label.config(text=f"Time Left: {time_left}s")
        timer_job = window.after(1000, update_timer)
    else:
        feedback.config(text="Time's Up! Moving to next question...", fg="#b82222")
        disable_options()
        next_btn.config(state="normal")


def disable_options():
    """Disables option buttons once an answer is selected or time runs out."""
    for btn in option_btns:
        btn.config(state="disabled")


def check_answer(selected):
    """Validates the chosen answer and halts the active timer."""
    global current_q, score, timer_job
    
    if timer_job:
        window.after_cancel(timer_job) 
        
    correct = question[current_q]['ans']
    if selected == correct:
        score += 1
        feedback.config(text='Correct!', fg="#60c969")
    else:
        feedback.config(text=f'Wrong! Actual answer is: {correct}', fg="#b82222")
        
    disable_options()
    next_btn.config(state="normal")


def next_question():
    """Progresses to the next question sequence or triggers results."""
    global current_q
    current_q += 1
    if current_q < len(question):
        load_question()
    else:
        show_result()


def load_question():
    """Resets the UI states and timer bounds for the upcoming question."""
    global time_left, timer_job
    
    if timer_job:
        window.after_cancel(timer_job)
        
    time_left = 45
    timer_label.config(text=f"Time Left: {time_left}s")
    
    q_data = question[current_q]
    question_label.config(text=f"Q{current_q + 1}. {q_data['q']}")
    
    for i, btn in enumerate(option_btns):
        btn.config(text=q_data['options'][i], state="normal")
        
    feedback.config(text='')
    next_btn.config(state="disabled")
    score_label.config(text=f'Score: {score}/{len(question)}')
    
    update_timer()  


def show_result():
    """Hides the game screen and displays the final score dashboard frame."""
    global timer_job
    if timer_job:
        window.after_cancel(timer_job)
        
    game_frame.pack_forget()
    result_frame.pack(fill="both", expand=True)
    
    final_score_label.config(text=f"You Scored: {score} / {len(question)}")
    if score >= 4:
        perf_label.config(text="🎉 GREAT JOB! 🎉", fg="#60c969")
    elif score >= 2:
        perf_label.config(text="👍 Good Attempt! 👍", fg="#0F3460")
    else:
        perf_label.config(text="😅 Better Luck Next Time! 😅", fg="#b82222")


# Initialize main window
window = tk.Tk()
window.title("Quiz App~")
window.geometry("500x520")
window.configure(bg="#ffe5ed")


# --- Welcome Screen ---
welcome_frame = tk.Frame(window, bg="#ffe5ed")
welcome_frame.pack(fill="both", expand=True)

tk.Label(
    welcome_frame, text="Welcome to the Quiz!", 
    font=("Sans Serif", 24, 'bold'), bg="#ffe5ed", fg="#2B2D42"
).pack(pady=50)

play_btn = tk.Button(
    welcome_frame, text="Play Game", font=("Sans Serif", 16, "bold"),
    bg="#0F3460", fg="white", padx=20, pady=10, command=start_game
)
play_btn.pack(pady=20)


# --- Game Screen ---
game_frame = tk.Frame(window, bg="#ffe5ed")

status_frame = tk.Frame(game_frame, bg="#ffe5ed")
status_frame.pack(fill="x", padx=20, pady=10)

score_label = tk.Label(
    status_frame, text="Score: 0/5", font=("Sans Serif", 13, "bold"), 
    bg="#0B0C10", fg="#F4F1DE", width=12
)
score_label.pack(side="left")

timer_label = tk.Label(
    status_frame, text="Time Left: 45s", font=("Sans Serif", 13, "bold"), 
    bg="#b82222", fg="white", width=14
)
timer_label.pack(side="right")

question_label = tk.Label(
    game_frame, text="", font=("Arial", 14, "bold"), 
    bg="#8D99AE", fg="#0B0C10", wraplength=450, justify='center', height=3
)
question_label.pack(pady=15, padx=10)

# Setting up option buttons
option_btns = []
for i in range(4):
    btn = tk.Button(
        game_frame, text="", font=("Arial", 12), width=40, 
        bg="#F8EDEB", fg="black", activebackground='#0F3460', activeforeground='white'
    )
    btn.pack(pady=5)
    option_btns.append(btn)

for i, btn in enumerate(option_btns):
    btn.config(command=lambda b=i: check_answer(option_btns[b].cget("text")))

feedback = tk.Label(game_frame, text="", font=("Arial", 13, "bold"), bg="#ffe5ed")
feedback.pack(pady=5)

next_btn = tk.Button(
    game_frame, text="Next Question", font=("Sans Serif", 13, "bold"), 
    bg="#EDF2F4", fg="#0B0C10", state="disabled", command=next_question
)
next_btn.pack(pady=8)


# --- Results Screen ---
result_frame = tk.Frame(window, bg="#ffe5ed")

tk.Label(
    result_frame, text="Quiz Finished!", 
    font=("Sans Serif", 24, 'bold'), bg="#ffe5ed", fg="#2B2D42"
).pack(pady=40)

final_score_label = tk.Label(
    result_frame, text="", font=("Sans Serif", 18, "bold"), 
    bg="#ffe5ed", fg="#0B0C10"
)
final_score_label.pack(pady=10)

perf_label = tk.Label(
    result_frame, text="", font=("Sans Serif", 16, "bold"), 
    bg="#ffe5ed"
)
perf_label.pack(pady=10)

play_again_btn = tk.Button(
    result_frame, text="Play Again", font=("Sans Serif", 14, "bold"),
    bg="#60c969", fg="white", padx=15, pady=8, command=reset_game
)
play_again_btn.pack(pady=30)

# Start Tkinter loop
window.mainloop()

