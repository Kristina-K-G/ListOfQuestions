import { QuestionsList } from "../../../widgets/questions-list/ui/QuestionsList";
import { Sidebar } from "../../../widgets/sidebar/ui/Sidebar";
import styles from "./Questions.module.css";

function Questions() {
  return (
    <main className={styles.page}>
      <QuestionsList />
      <Sidebar />
    </main>
  );
}

export default Questions;
