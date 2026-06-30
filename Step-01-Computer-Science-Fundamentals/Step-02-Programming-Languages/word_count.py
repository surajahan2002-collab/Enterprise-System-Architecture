# Step 02: Polyglot Architecture
# Interpreted Language (Python) Implementation

def count_words():
    try:
        # Python abstracts away the manual stream handling
        with open("sample.txt", "r") as file:
            words = file.read().split()
            print(f"[Python Interpreted Execution] Total words counted: {len(words)}")
    except FileNotFoundError:
        print("[ERROR] Unable to open the file.")

if __name__ == "__main__":
    count_words()
