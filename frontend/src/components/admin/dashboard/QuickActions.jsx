import { Link } from 'react-router-dom'

function QuickActions({ actions }) {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Link
              key={action.title}
              to={action.link}
              className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                size={42}
                className="mb-4 text-rose-500 transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="text-xl font-semibold text-gray-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Open {action.title}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default QuickActions