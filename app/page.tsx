export default function Home() {
  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:m-8">
        <div>
          <h1 className="text-title text-content-primary mb-2">Your schedule</h1>
          <p className="text-paragraph-small text-content-secondary">
            Here you can see all clients and services schedules for today
          </p>
        </div>
      </div>
    </div>
  )
}
