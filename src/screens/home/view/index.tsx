import { ScrollViewContainer } from '@/components/ui/ScrollViewContainer';
import { HomeHeader } from '@/screens/home/components/HomeHeader';
import { StatsGrid } from '@/screens/home/components/StatsGrid';
import { TasksSection } from '@/screens/home/components/TasksSection';
import { useHome } from '@/screens/home/logic/useHome';

export const Home = () => {
  const {
    stats,
    tasks,
    filter,
    setFilter,
    isLoading,
    isError,
    handleLogout,
    handleCreateTask,
    handleEditTask,
    handleToggleTask,
    handleToggleSubtask,
    userName,
    handleAddSubtask,
  } = useHome();

  return (
    <ScrollViewContainer>
      <HomeHeader userName={userName} onLogout={handleLogout} />
      <StatsGrid stats={stats} onSelect={setFilter} />
      <TasksSection
        tasks={tasks}
        isLoading={isLoading}
        isError={isError}
        onEditTask={handleEditTask}
        onToggleTask={handleToggleTask}
        onToggleSubtask={handleToggleSubtask}
        onAddSubtask={handleAddSubtask}
        onCreateTask={handleCreateTask}
        filter={filter}
      />
    </ScrollViewContainer>
  );
};
