import { useState } from "react"
import { Form, Input, Select, Button, message } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"

interface Activity {
  id: string
  name: string
  unit: string
  weight: number
  subActivities: SubActivity[]
}

interface SubActivity {
  id: string
  name: string
  unit: string
  weight: number
}

interface FormValues {
  activities: {
    id: string
    name: string
    unit: string
    weight: number
    subActivities: {
      id: string
      name: string
      unit: string
      weight: number
    }[]
  }[]
}

export default function ChecklistForm() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      name: "Piling",
      unit: "Piers",
      weight: 50,
      subActivities: [
        { id: "1.1", name: "", unit: "", weight: 0 },
      ],
    },
  ])

  const addActivity = () => {
    const newId = (activities.length + 1).toString()
    setActivities([
      ...activities,
      {
        id: newId,
        name: "",
        unit: "",
        weight: 0,
        subActivities: [],
      },
    ])
  }

  const addSubActivity = (activityId: string) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === activityId) {
          const subId = `${activityId}.${activity.subActivities.length + 1}`
          return {
            ...activity,
            subActivities: [...activity.subActivities, { id: subId, name: "", unit: "", weight: 0 }],
          }
        }
        return activity
      }),
    )
  }

  const deleteActivity = (activityId: string) => {
    setActivities(activities.filter((a) => a.id !== activityId))
  }

  const deleteSubActivity = (activityId: string, subActivityId: string) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === activityId) {
          return {
            ...activity,
            subActivities: activity.subActivities.filter((sub) => sub.id !== subActivityId),
          }
        }
        return activity
      }),
    )
  }

  const totalWeight = activities.reduce(
    (sum, activity) => sum + activity.weight + activity.subActivities.reduce((subSum, sub) => subSum + sub.weight, 0),
    0,
  )

  const handleSubmit = async () => {
    try {
      await form.validateFields()

      if (totalWeight !== 100) {
        messageApi.error("Total weight must equal 100%")
        return
      }

      const values = form.getFieldsValue()
      console.log("Form values:", values)

      messageApi.success("Form saved successfully")

     
    } catch (error) {
        messageApi.error("Please fill in all required fields correctly")
    }
  }

  return (
    <div className="px-4 py-2 checklist">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Sandbox Solar Farm - CP Checklist</h1>
        <div className="flex items-center gap-4">
          <span className={totalWeight === 100 ? "text-green-500" : "text-red-500"}>
            Weight Percent: {totalWeight}%
          </span>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>

      <Form form={form} layout="vertical" name="checklistForm" initialValues={{ activities }}>
        {activities.map((activity) => (
          <div key={activity.id} className="mb-8">
            <div className="grid grid-cols-[20px,1fr,1fr,120px,40px] gap-2 items-start">
              <div className="text-sm w-[40px] text-gray-600 mt-2">{activity.id}</div>
              <div className="font-medium text-sm text-gray-600 mt-2">Activity</div>
              <div className="font-medium text-sm text-gray-600 mt-2">Unit of count</div>
              <div className="font-medium text-sm text-gray-600 mt-2">Weight</div>
            </div>

            <div className="grid grid-cols-[20px,1fr,1fr,120px,40px] gap-2 items-start mt-1">
              <div></div>
              <Form.Item
                name={["activities", activity.id, "name"]}
                rules={[{ required: true, message: "Activity name is required" }]}
                className="mb-2"
              >
                <Input
                  value={activity.name}
                  onChange={(e) =>
                    setActivities(activities.map((a) => (a.id === activity.id ? { ...a, name: e.target.value } : a)))
                  }
                />
              </Form.Item>
              <Form.Item
                name={["activities", activity.id, "unit"]}
                rules={[{ required: true, message: "Unit is required" }]}
                className="mb-2"
              >
                <Select
                  style={{ height: "42px", fontSize: "16px" }}
                  value={activity.unit}
                  onChange={(value) =>
                    setActivities(activities.map((a) => (a.id === activity.id ? { ...a, unit: value } : a)))
                  }
                >
                  <Select.Option value="Piers">Piers</Select.Option>
                  <Select.Option value="Tracker">Tracker</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["activities", activity.id, "weight"]}
                rules={[
                  { required: true, message: "Weight is required" },
                  { type: "number", min: 0, max: 100, message: "Weight must be between 0 and 100" },
                ]}
                className="mb-2"
              >
                <Input
                  type="number"
                  value={activity.weight}
                  addonAfter="%"
                  onChange={(e) =>
                    setActivities(
                      activities.map((a) => (a.id === activity.id ? { ...a, weight: Number(e.target.value) } : a)),
                    )
                  }
                />
              </Form.Item>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => deleteActivity(activity.id)} />
            </div>

            <div className="relative ml-[30px] pl-[30px] border-l-2 border-gray-200">
              {activity.subActivities.map((subActivity) => (
                <div key={subActivity.id} className="grid grid-cols-[20px,1fr,1fr,120px,40px] gap-4 items-start mt-4">
                  <div className="text-sm text-gray-600 relative">
                    <span className="absolute -left-[30px] top-1/2 h-px w-[20px] bg-gray-200"></span>
                    {subActivity.id}
                  </div>
                  <Form.Item
                    name={["activities", activity.id, "subActivities", subActivity.id, "name"]}
                    rules={[{ required: true, message: "Sub-activity name is required" }]}
                    className="mb-2"
                  >
                    <Input
                      value={subActivity.name}
                      onChange={(e) =>
                        setActivities(
                          activities.map((a) =>
                            a.id === activity.id
                              ? {
                                  ...a,
                                  subActivities: a.subActivities.map((sub) =>
                                    sub.id === subActivity.id ? { ...sub, name: e.target.value } : sub,
                                  ),
                                }
                              : a,
                          ),
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name={["activities", activity.id, "subActivities", subActivity.id, "unit"]}
                    rules={[{ required: true, message: "Unit is required" }]}
                    className="mb-2"
                  >
                    <Select
                      style={{ height: "42px", fontSize: "16px" }}
                      value={subActivity.unit}
                      onChange={(value) =>
                        setActivities(
                          activities.map((a) =>
                            a.id === activity.id
                              ? {
                                  ...a,
                                  subActivities: a.subActivities.map((sub) =>
                                    sub.id === subActivity.id ? { ...sub, unit: value } : sub,
                                  ),
                                }
                              : a,
                          ),
                        )
                      }
                    >
                      <Select.Option value="Piers">Piers</Select.Option>
                      <Select.Option value="BOM Fasteners">BOM Fasteners</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["activities", activity.id, "subActivities", subActivity.id, "weight"]}
                    rules={[
                      { required: true, message: "Weight is required" },
                      { type: "number", min: 0, max: 100, message: "Weight must be between 0 and 100" },
                    ]}
                    className="mb-2"
                  >
                    <Input
                      type="number"
                      value={subActivity.weight}
                      addonAfter="%"
                      onChange={(e) =>
                        setActivities(
                          activities.map((a) =>
                            a.id === activity.id
                              ? {
                                  ...a,
                                  subActivities: a.subActivities.map((sub) =>
                                    sub.id === subActivity.id
                                      ? {
                                          ...sub,
                                          weight: Number(e.target.value),
                                        }
                                      : sub,
                                  ),
                                }
                              : a,
                          ),
                        )
                      }
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteSubActivity(activity.id, subActivity.id)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Button type="dashed" onClick={() => addSubActivity(activity.id)} className="w-[calc(100%-40px)]">
                + Sub-activity
              </Button>
            </div>
          </div>
        ))}

        <Button type="dashed" onClick={addActivity} className="w-full" icon={<PlusOutlined />}>
          Add More
        </Button>
      </Form>
    </div>
  )
}

